import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlineService {
  // Define an event emitter to notify when online status changes
  onlineStatusChanged = new EventEmitter<boolean>();

  constructor(public httpClient: HttpClient) {
    // window.addEventListener('online', () => {
    //   this.onlineStatusChanged.emit(true); // App is online
    //   this.syncOfflineTodos(); // Sync offline todos when online
    // });

    // window.addEventListener('offline', () => {
    //   this.onlineStatusChanged.emit(false); // App is offline
    // });
    // this.syncOfflineTodos();

  }

  
  saveTodoLocally(todoData: any) {
    // Save the todoData to local storage
    const offlineTodos = JSON.parse(localStorage.getItem('offlineTodos') || '[]');
    offlineTodos.push(todoData);
    localStorage.setItem('offlineTodos', JSON.stringify(offlineTodos));
  }

  syncOfflineTodos() {
    // Check if online
    if (navigator.onLine) {
      const offlineTodos = JSON.parse(localStorage.getItem('offlineTodos') || '[]');
      console.log(offlineTodos)
      for (const todoData of offlineTodos) {
        this.httpClient.post('http://localhost:3000/myTodos', todoData).subscribe((res: any) => {
          console.log(res);
        });
      }
      // Clear offlineTodos in local storage
      localStorage.removeItem('offlineTodos');
    }
  }
}