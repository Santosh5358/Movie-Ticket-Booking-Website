package repository;

import com.firstApplicationApp.test.cousres.bean.BookApp;
import com.firstApplicationApp.test.cousres.controller.CourseController;
import com.firstApplicationApp.test.cousres.repository.BookRepository;
import com.firstApplicationApp.test.cousres.repository.PassengerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@SpringBootApplication
public class ControllerTester {
    BookRepository bookRepository;

    PassengerRepository passengerRepository;

    CourseController courseController ;


    @Test
    void testGetAllCourses() throws Exception {
       bookRepository=  Mockito.mock(BookRepository.class);
       courseController = Mockito.mock(CourseController.class);
        List<BookApp> bookings = new ArrayList<>();
        bookings.add(new BookApp(1,2,"logan","https://th.bing.com/th/id/OIP.KV4AE1Wf1xrKR2xntIl7gAHaEo?w=272&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",200,"avi@gmail.com"));
//        bookApp.add(bookApp);
        Mockito.when(bookRepository.findAll()).thenReturn(bookings);
        var result = courseController.getAllCourses();
        Assertions.assertTrue(result instanceof Collection<?>);
        Assertions.assertEquals(1, bookings.get(0).getId());
    }

    @Test
    void testGetByEmail() throws Exception {
        bookRepository=  Mockito.mock(BookRepository.class);
        courseController = Mockito.mock(CourseController.class);
        List<BookApp> bookings = new ArrayList<>();
        bookings.add(new BookApp(1,2,"logan","https://th.bing.com/th/id/OIP.KV4AE1Wf1xrKR2xntIl7gAHaEo?w=272&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",200,"avi@gmail.com"));
//        bookApp.add(bookApp);
        Mockito.when(bookRepository.findByEmail("avi@gmail.com")).thenReturn(bookings);
        var result = courseController.getByEmail("avi@gmail.com");
        Assertions.assertTrue(result instanceof Collection<?>);
        Assertions.assertEquals("avi@gmail.com", bookings.get(0).getEmail());
    }

    @Test
    void testGetByMovie() throws Exception {
        bookRepository=  Mockito.mock(BookRepository.class);
        courseController = Mockito.mock(CourseController.class);
        List<BookApp> bookings = new ArrayList<>();
        bookings.add(new BookApp(1,2,"logan","https://th.bing.com/th/id/OIP.KV4AE1Wf1xrKR2xntIl7gAHaEo?w=272&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",200,"avi@gmail.com"));
        Mockito.when(bookRepository.findByselectedMovie("logan")).thenReturn(bookings);
        var result = courseController.getOneCourses("avi@gmail.com");
        Assertions.assertTrue(result instanceof Collection<?>);
        Assertions.assertEquals("logan", bookings.get(0).getSelectedMovie());
    }


}
