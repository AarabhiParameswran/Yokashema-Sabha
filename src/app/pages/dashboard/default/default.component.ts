import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css'
})
export class DefaultComponent implements OnInit {
  // Current date for dynamic content
  currentDate: Date = new Date();
  
  // Upcoming events list
  upcomingEvents = [
    {
      title: 'Annual General Meeting',
      date: new Date(2025, 5, 15), // June 15, 2025
      location: 'Thrissur'
    },
    {
      title: 'Cultural Festival',
      date: new Date(2025, 7, 10), // August 10, 2025
      location: 'Kochi'
    },
    {
      title: 'Scholarship Awards Ceremony',
      date: new Date(2025, 8, 5), // September 5, 2025
      location: 'Trivandrum'
    }
  ];
  
  // Announcements for ticker
  announcements: string[] = [
    'Upcoming Event: Annual General Meeting on June 15, 2025',
    'New Publication: "Cultural Heritage of Kerala Brahmins" now available',
    'Scholarship Applications for 2025-26 now open',
    'Monthly prayer meeting scheduled for last Sunday of every month'
  ];
   quickLinks = [
    { label: 'Membership', route: '/membership' },
    { label: 'Events', route: '/events' },
    { label: 'Publications', route: '/publications' },
    { label: 'Scholarships', route: '/scholarships' },
    { label: 'Contact Us', route: '/contact' }
  ];
  // Combined announcements string for ticker
  tickerText: string = '';
  
  constructor() { }
  
  ngOnInit(): void {
    // Combine announcements with separator for ticker
    this.tickerText = this.announcements.join(' | ');
  }
  
  // Method to format date in desired format
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  // Methods for any interactive elements we might add later
  navigateTo(section: string): void {
    console.log('Navigating to:', section);
    // Navigation logic would go here
  }
}