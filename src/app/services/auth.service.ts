import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
    // Verifica se estamos no lado do cliente antes de acessar `window`
    if (isPlatformBrowser(this.platformId)) {
      const authConfig: AuthConfig = {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        clientId: '85250142723-acem89snn2l0st66ojdn9p8q8jkjgjfe.apps.googleusercontent.com',
        redirectUri: window.location.origin + '/dashboard',
        scope: 'openid profile email',
      };

      this.oAuthService.configure(authConfig);
      this.oAuthService.setupAutomaticSilentRefresh();
      this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    }
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile() {
    const profile = this.oAuthService.getIdentityClaims();
    return profile;
  }

  getToken() {
    return this.oAuthService.getAccessToken();
  }
}
