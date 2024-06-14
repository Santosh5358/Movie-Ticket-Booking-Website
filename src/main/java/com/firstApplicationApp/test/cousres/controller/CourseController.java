package com.firstApplicationApp.test.cousres.controller;

//import java.util.*;

import com.firstApplicationApp.test.cousres.bean.*;
import com.firstApplicationApp.test.cousres.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class CourseController {

	@Autowired
	private PasswordEncoder passwordEncoder;
	private BookRepository repository;
    private MovieRepository movieRepository;
	@Autowired
	private RegistrationRepository registrationRepository;
    @Autowired
	ImageRepository imageRepository;
    @Autowired
    private FilterChainProxy filterChainProxy;

	@Autowired
	public CourseController(BookRepository repository, MovieRepository movieRepository, RegistrationRepository registrationRepository)  {
		this.repository = repository;
        this.movieRepository=movieRepository;
		this.registrationRepository=registrationRepository;
    }

	@GetMapping("/courses")
	public ResponseEntity<?> getAllCourses() throws Exception{
		List<BookApp> books = repository.findAll();
//		List<BookApp> books2 = books.stream().filter(BookApp::isDeleted).toList();
//		List<BookApp> books = repository.findAllRecords();
//		List<BookApp> books = repository.findAll().stream()
//				.filter(book -> book.getPassengers().get(0).isDeleted())
//				.collect(Collectors.toList());

//		List<BookApp> books=repository.findAll().stream().filter(s-> s.getPassengers().get(0).isDeleted()).toList();
		if(books.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data Found");
		}
		else {
			return  ResponseEntity.ok(books);
		}
	}



	@GetMapping ("/courses/byEmail/{email}")
	public ResponseEntity<?> getByEmail(@PathVariable String email) {
//		BookApp bookApp = repository.findByEmail(email).stream().filter(str->str.getEmail().equals(email)).findFirst().orElseThrow(()-> new Exception("Ticket not found "));
//		return (List<BookApp>) bookApp;

		try{
//			List<BookApp> byEmail = repository.findByEmail(email);
			List<BookApp> byEmail=repository.findAll().stream().filter(s->s.getEmail().matches(email)).filter(s->!s.isDeleted()).toList();
			for (BookApp s : byEmail){
				List<Passenger> passengers = s.getPassengers();
				passengers.removeIf(p->p.isDeleted());
			}
			List<BookApp> filtered = byEmail.stream().filter(book->!book.isDeleted()).collect(Collectors.toList());
//			List<BookApp> filtered = filtered2.stream()
//					.filter(book -> !book.getPassengers().get(0).isDeleted())
//					.collect(Collectors.toList());
//			List<BookApp> filtered = filtered2.stream()
//					.filter(bookApp -> bookApp.getPassengers().stream()
//							.noneMatch(Passenger::isDeleted))
//					.toList();

//			List<BookApp> filtered = filtered2.stream()
//					.filter(bookApp -> bookApp.getPassengers().stream()
//							.noneMatch(passenger -> passenger.isDeleted())).filter(bookApp -> bookApp.getPassengers().)
//					.collect(Collectors.toList());

			if(filtered.isEmpty()){
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data Found for email: "+email);
			}

			return  ResponseEntity.ok(filtered);
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
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

	public ResponseEntity<?> getByName(@PathVariable String name) throws Exception {

		try {

//			List<BookApp> bookIdByPassengerName = repository.findAll().stream()
//					.filter(bookApp -> bookApp.getPassengers().stream()
//							.noneMatch(Passenger::isDeleted))
//					.toList();

//			List<BookApp> bookIdByPassengerName = repository.findBookIdByPassengerName(name);
			List<BookApp> bookIdByPassengerName=repository.findAll().stream().filter(s->s.getPassengers().get(0).getName().toLowerCase().contains(name.toLowerCase())).toList();
			if (bookIdByPassengerName.isEmpty()){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data Found for name: "+name);
			}
			return  ResponseEntity.ok(bookIdByPassengerName);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

	}
	//Get API called by movie
	@GetMapping("/courses/byMovie/{movie}")

	public ResponseEntity<?> getOneCourses(@PathVariable String movie) throws Exception {
//		List<BookApp> byselectedMovie = repository.findByselectedMovie(movie);

		try {
			List<BookApp> bySelectedMovie = repository.findAll()
					.stream()
					.filter(book -> book.getSelectedMovie().toLowerCase().contains(movie.toLowerCase()))
					.toList();

			if(!bySelectedMovie.isEmpty()){
				return  ResponseEntity.ok(bySelectedMovie);
			}else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data Found With Movie: "+movie);
			}
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

	}



	//Add data to database
	@PostMapping ("/courses")

	public ResponseEntity<?> addCourse(@RequestBody BookApp course) throws Exception {
		try {
			System.out.println("Recive Courses "+course);
			course.setId(null);
			course.setDeleted(false);
			repository.save(course);
			return ResponseEntity.status(HttpStatus.CREATED).body("Ticket Successfully Book with Email: "+course.getEmail());
//			return save;
		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

//	Add Moive
//	@PostMapping ("/courses/movie")
//	public ResponseEntity<?> addMovie(@RequestBody MovieAdd movieAdd) throws Exception {
//		try {
//			System.out.println(movieAdd);
//			movieAdd.setId(null);
//			movieRepository.save(movieAdd);
//			return ResponseEntity.status(HttpStatus.CREATED).body("Movi");
//		}catch (Exception e){
////			e.printStackTrace();
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//		}
//	}

	@GetMapping("/public/movie")
	public ResponseEntity<?> getAllMovie() throws Exception {
		try {
			List<ImageModel> all = imageRepository.findAll();
			if (all.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data Found");
			}else {
				return  ResponseEntity.ok(all);
			}
		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Not Responding Try Again Later");
		}

	}

	@GetMapping("/courses/deletedMovie")
	public ResponseEntity<?> deletedMovie() throws Exception {
		try {
			List<BookApp> allList = repository.findAll();
			List<BookApp> filtered = allList.stream().filter(BookApp::isDeleted).toList();
			if(!filtered.isEmpty()){
				return  ResponseEntity.ok(filtered);
			}else{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data Found");
			}
		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

	}
	
	@DeleteMapping("/courses/deleteMovie/{id}")
	@Transactional
	public ResponseEntity<?> deleteMovie(@PathVariable Long id) throws Exception {
		System.out.println("data recived"+id);

		try {


			imageRepository.deleteById(id);
			repository.deleteById(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Data Successfully");
		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

	}


	//Update the database
	@PutMapping ("/courses/{id}")
	public ResponseEntity<?> updateCourse(@PathVariable long id,@RequestBody BookApp course) {
		 try {
			 repository.save(course);
			 return ResponseEntity.status(HttpStatus.CREATED).body("Updated Data Successfully");
		 }catch (Exception e){
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		 }
	}
//	public void updateCourse(@PathVariable long id,@RequestBody Course course) {
//		repository.save(course);
//	}

	@DeleteMapping ("/courses/cancle/{id}")
	public ResponseEntity<?> deleteCourse(@PathVariable long id) throws Exception {
		try {
			BookApp bookApp = repository.findById(id).orElseThrow(()-> new Exception("Ticket not found "));
			bookApp.setDeleted(true);
			repository.save(bookApp);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Data");
		}
		catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@DeleteMapping("/courses/{bookId}/{name}")
	@Transactional
	public ResponseEntity<?> deleteByPassengerName(@PathVariable long bookId, @PathVariable String name) throws Exception {

		try{
			BookApp bookApp = repository.findById(bookId).orElseThrow(()-> new Exception("Ticket not found "));
			Passenger passenger = bookApp.getPassengers().stream().filter(str-> str.getName().equals(name)).findFirst().orElseThrow(()->new Exception("Passenger not Found"));
//			bookApp.getPassengers().remove(passenger);

			bookApp.setAmount(bookApp.getAmount()-60);
			bookApp.setNumberOfPassengers(bookApp.getNumberOfPassengers()-1);
			passenger.setDeleted(true);
			repository.save(bookApp);
			return ResponseEntity.status(HttpStatus.CREATED).body("Deleted Data Successfully");
		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}


	@GetMapping("/public/getUser/{email}/{password}")
	public ResponseEntity<?> getUser(@PathVariable String email,@PathVariable String password) throws Exception {

			try {
				boolean b=registrationRepository.existsByEmail(email);
				if(b){
					List<Registration> user=registrationRepository.findByEmail(email);

					if(passwordEncoder.matches(password,user.get(0).getPassword())){
						return ResponseEntity.ok("Login Successfull");

					}else {
						return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong Password");
					}
				}else{
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data Found");
				}
			}catch (Exception e){
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
			}

	}



	@PostMapping ("/public/addUser")
	public ResponseEntity<?> addUser(@RequestBody Registration registration) throws Exception {
		try {
			String email=registration.getEmail();
			boolean b=registrationRepository.existsByEmail(email);
			if(b){
				return ResponseEntity.status(HttpStatus.CONFLICT).body("Email Already Exists");

			}else {
				registration.setId(null);
				String hasPassword=passwordEncoder.encode(registration.getPassword());
				registration.setPassword(hasPassword);
				registrationRepository.save(registration);
				return ResponseEntity.status(HttpStatus.CREATED).body("Registration Successfully Added");
			}


		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}



	@PostMapping("/courses/movieAdd/{name}/{rating}")
	public ResponseEntity<?> addMovie(@RequestParam("myFile") MultipartFile file,@PathVariable String name,@PathVariable String rating) throws IOException {
		try {
			ImageModel img=new ImageModel(file.getOriginalFilename(),file.getContentType(), file.getBytes(),name,rating);
			imageRepository.save(img);
			return ResponseEntity.status(HttpStatus.CREATED).body("Movie Added Successfully");
		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

}
