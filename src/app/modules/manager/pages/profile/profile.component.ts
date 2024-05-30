import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../../../../services/models/user/user-response";
import {ShopResponse} from "../../../../services/models/shop/shop-response";
import {UserService} from "../../../../services/services/user.service";
import {ShopService} from "../../../../services/services/shop.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShopUpdateRequest} from "../../../../services/models/shop/shop-update-request";
import {UserUpdateRequest} from "../../../../services/models/user/user-update-request";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: UserResponse | null = null;
  shop: ShopResponse | null = null;
  profileForm: FormGroup;
  shopForm: FormGroup;


  constructor(private userService: UserService,
              private shopService: ShopService,
              private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });

    this.shopForm = this.fb.group({
      name: [''],
      address: [''],
      contactNumber: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.userService.whoAmI().subscribe(user => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
    this.shopService.findShopByConnectedUser().subscribe(shop => {
      this.shop = shop;
      this.shopForm.patchValue(shop);
    })
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.value } as UserUpdateRequest;
      this.userService.updateUser({body: updatedUser}).subscribe({
        next: res => {
          this.user = res;
        },
        error: err => {
          console.error(err);
        }
      })
      // Call service to update user information
      console.log('Updated User:', updatedUser);
    }
  }

  updateShop(): void {
    if (this.shopForm.valid) {
      const updatedShop = { ...this.shop, ...this.shopForm.value } as ShopUpdateRequest;
      this.shopService.updateShop({body: updatedShop}).subscribe({
          next: res => {
            this.shop = res;
          },
          error: err => {
            console.error(err);
          }
        }
      )
      console.log('Updated Shop:', updatedShop);
    }
  }
}
