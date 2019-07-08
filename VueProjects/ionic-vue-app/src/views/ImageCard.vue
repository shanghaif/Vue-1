<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Hello, Ionic!</ion-title>
        <!-- <ion-nav-back-button>
        </ion-nav-back-button> -->
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <img src="https://images.unsplash.com/photo-1552394459-917cbbffbc84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"/>
        <ion-card-header>
          <ion-card-subtitle>Isn't it great?</ion-card-subtitle>
          <ion-card-title>Look at this view!</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Although, it does look fairly cold.
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-app>
</template>