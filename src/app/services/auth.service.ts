import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
  }

  getCurrentUserEmail(): string | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).email : null;
  }

  register(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
}
