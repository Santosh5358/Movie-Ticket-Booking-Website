package com.firstApplicationApp.test.cousres.controller;

//import java.util.*;

import com.firstApplicationApp.test.cousres.bean.*;
import com.firstApplicationApp.test.cousres.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class CourseController {

	private BookRepository repository;
	private PassengerRepository repository2;
	private MovieRepository movieRepository;
	@Autowired
	private RegistrationRepository registrationRepository;
    @Autowired
    private PassengerRepository passengerRepository;
	private MovieRepositoryWithImage movieRepositoryWithImage;
	@Autowired
	ImageRepository imageRepository;

	@Autowired
	public CourseController(BookRepository repository, PassengerRepository repository2, MovieRepository movieRepository, RegistrationRepository registrationRepository,MovieRepositoryWithImage movieRepositoryWithImage)  {
		this.repository = repository;
		this.repository2 = repository2;
		this.movieRepository=movieRepository;
		this.registrationRepository=registrationRepository;
		this.movieRepositoryWithImage=movieRepositoryWithImage;
	}

	@GetMapping("/courses")
	public List<BookApp> getAllCourses() throws Exception{
//		List<BookApp> books = repository.findAll();
//		List<BookApp> books2 = books.stream().filter(BookApp::isDeleted).toList();
		List<BookApp> books = repository.findAllRecords();
		if(books.isEmpty())
			new Exception("No Data Found");
		return books;
	}



	@GetMapping ("/courses/byEmail/{email}")
	public List<BookApp> getByEmail(@PathVariable String email) throws Exception {
//		BookApp bookApp = repository.findByEmail(email).stream().filter(str->str.getEmail().equals(email)).findFirst().orElseThrow(()-> new Exception("Ticket not found "));
//		return (List<BookApp>) bookApp;

		try{
			List<BookApp> byEmail = repository.findByEmail(email);
			List<BookApp> filtered = byEmail.stream().filter(s-> !s.isDeleted()).collect(Collectors.toList());

			if(filtered.isEmpty())
				throw new Exception("No Ticket Found");
			return  filtered;
		}
		catch(Exception e){
			throw new Exception("Data Base Is not Connected");
		}
	}

	//Get API called by id
//	@GetMapping("/courses/byId/{id}")
//
//	public BookApp getOneCourses(@PathVariable long id) {
//			Optional<BookApp> course= repository.findById(id);
//			if(course.isEmpty()){
//				throw  new RuntimeException("Course not found");
//			}
//			return repository.getReferenceById(id);
//
//	}

	//Get API called by name
	@GetMapping("/courses/byName/{name}")

	public List<BookApp> getByName(@PathVariable String name) throws Exception {

		try {
			List<BookApp> bookIdByPassengerName = repository.findBookIdByPassengerName(name);
			if (bookIdByPassengerName.isEmpty()){
				throw new Exception("No Data Found");
			}
			return bookIdByPassengerName;
		}catch (Exception e) {
			throw new Exception("Data Base Is not Connected");
		}

	}
	//Get API called by movie
	@GetMapping("/courses/byMovie/{movie}")

	public List<BookApp> getOneCourses(@PathVariable String movie) throws Exception {
		List<BookApp> byselectedMovie = repository.findByselectedMovie(movie);

		if(!byselectedMovie.isEmpty()){
			return byselectedMovie;
		}
		throw new Exception("Data Not Found");
	}



	//Add data to database
	@PostMapping ("/courses")

	public void addCourse(@RequestBody BookApp course) throws Exception {
		try {
			System.out.println("Recive Courses "+course);
			course.setId(null);
			course.setDeleted(false);
			repository.save(course);

//			return save;
		}catch(Exception e){
			throw new Exception("Data Base Is not Connected");
		}
	}

//	Add Moive
	@PostMapping ("/courses/movie")
	public ResponseEntity<String> addMovie(@RequestBody MovieAdd movieAdd) throws Exception {
		try {
			System.out.println(movieAdd);
			movieAdd.setId(null);
			movieRepository.save(movieAdd);
			return ResponseEntity.ok("Movie added successfully");
		}catch (Exception e){
//			e.printStackTrace();
			throw new Exception("Data Base Is not Connected");
		}
	}

	@GetMapping("/public/Movie")
	public List<MovieAdd> getAllMovie() throws Exception {
		try {
			List<MovieAdd> all = movieRepository.findAll();
			if (all.isEmpty())
				throw new Exception("No Data Found");
			return all;
		}catch (Exception e){
			throw new Exception("Data Base Is not Connected");
		}

	}
	
	@DeleteMapping("/courses/DeleteMovie/{id}")
	@Transactional
	public void DeleteMovie(@PathVariable Long id) throws Exception {
		System.out.println("data recived"+id);

		movieRepository.deleteById(id);

	}


	//Update the database
	@PutMapping ("/courses/{id}")
	public void updateCourse(@PathVariable long id,@RequestBody BookApp course) {
		 repository.save(course);
	}
//	public void updateCourse(@PathVariable long id,@RequestBody Course course) {
//		repository.save(course);
//	}

	@DeleteMapping ("/courses/cancle/{id}")
	public void deleteCourse(@PathVariable long id) throws Exception {
		try {
			BookApp bookApp = repository.findById(id).orElseThrow(()-> new Exception("Ticket not found "));
			bookApp.setDeleted(true);
			repository.save(bookApp);
		}
		catch (Exception e){
            throw new Exception("Data Not Found");
		}
	}


//	@DeleteMapping ("/courses/{bookId}/{id}")
//	public void deleteCourseById(@PathVariable String bookId,@PathVariable long id){
//
////			list<BookApp> co=repository2.findOneAndUpdate(id).remove();
//
//
//	}
	@DeleteMapping("/courses/{bookId}/{name}")
	@Transactional
	public String deleteByPassengerName(@PathVariable long bookId, @PathVariable String name) throws Exception {

		try{
			BookApp bookApp = repository.findById(bookId).orElseThrow(()-> new Exception("Ticket not found "));
			Passenger passenger = bookApp.getPassengers().stream().filter(str-> str.getName().equals(name)).findFirst().orElseThrow(()->new Exception("Passenger not Found"));
//			bookApp.setDeleted(true);
			bookApp.getPassengers().remove(passenger);

			bookApp.setAmount(bookApp.getAmount()-60);
			bookApp.setNumberOfPassengers(bookApp.getNumberOfPassengers()-1);
			repository.save(bookApp);
			return "passenger deleted Successfully";
		}catch (Exception e){
			throw new Exception("Data Base Is not Connected");
		}
	}


	@GetMapping("/public/getUser/{email}/{password}")
	public boolean getUser(@PathVariable String email,@PathVariable String password) throws Exception {
		try {
			boolean b=registrationRepository.existsByEmail(email);
			if(b){
				List<Registration> user=registrationRepository.findByEmail(email);
				System.out.println(user);
				if(user.get(0).getPassword().equals(password)){
					return true;
				}else {
					throw new Exception("Wrong Email or Password");
				}
			}else{
				throw new Exception("User Not Found");
			}
		}catch (Exception e){
			throw new Exception("Data Base Is not Connected");
		}
	}



	@PostMapping ("/public/AddUser")
	public void addUser(@RequestBody Registration registration) throws Exception {
		try {
			String email=registration.getEmail();
			boolean b=registrationRepository.existsByEmail(email);
			if(b){
				throw new Exception("User already exists");
			}
				registration.setId(null);
				registrationRepository.save(registration);



		}catch (Exception e){
			throw new Exception("Data Base Is not Connected");
		}
	}



	@PostMapping("/courses/movieAdd")
	public void addMovie(@RequestParam("myFile") MultipartFile file) throws IOException {
		ImageModel img=new ImageModel(file.getOriginalFilename(),file.getContentType(), file.getBytes());
//		ImageModel.setId(null);
		imageRepository.save(img);
//		ImageModel movie=new ImageModel(file.getName(),file.getContentType(), file.getBytes());

//		final MovieAddWithImage sav=movieRepositoryWithImage.save(movie);
//		movieRepositoryWithImage.save(new MovieAddWithImage(name,rating, imageFile.getBytes()));
//		return ResponseEntity.ok("Movie added successfully!");
	}

}
