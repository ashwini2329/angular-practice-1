import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Import routes from app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Provide HttpClient
    HttpClientModule // Add HttpClientModule
  ]
})
.catch(err => console.error(err));
