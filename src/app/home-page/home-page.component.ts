import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page:not(p)',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  dummyMovies = [
    { name: 'Logan', image: 'https://th.bing.com/th/id/OIP.9RQq34KOh_CypCe4_yk8LwHaEo?w=260&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7', rating: 4.5 },
    { name: 'Sci-Fi', image: 'https://th.bing.com/th/id/OIP.KV4AE1Wf1xrKR2xntIl7gAHaEo?w=272&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', rating: 4.9 },
    { name: 'Happy', image: 'https://th.bing.com/th/id/OIP.6LvtH2kWRU2XX31K0H-VxQHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', rating: 4.2 },
    { name: 'Seventh Son', image: 'https://th.bing.com/th/id/OIP.WnvLKUg6XLSXu0wosVK3lgHaEo?rs=1&pid=ImgDetMain', rating: 4.5 },
    { name: 'Rampage', image: 'https://wallpapers.com/images/file/the-rock-rampage-hollywood-movie-xb0n4qwqh9s6ol6z.jpg', rating: 4.9 },
    { name: 'Tommorw', image: 'https://4.bp.blogspot.com/-WcDlabF_4io/U1-PY08tQGI/AAAAAAAAA5w/MHABjLQsZkE/s1600/Best+Hollywood+Action+Movies+List+2014+Top+10.jpg', rating: 4.2 }
];
}
