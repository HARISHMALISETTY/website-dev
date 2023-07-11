import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { CancellationPolicyComponent } from '../cancellation-policy/cancellation-policy.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  address = `\n
  CIN: L90001MH2001PLC130485\n
  Reg. and Corporate Office:  1402-1404, 14th Floor, \nDev Corpora Building, Opp. Cadbury Company,\n Eastern Express Highway, Thane (West) – 400 601`;

  constructor(public dialog: MatDialog) { }
  openPrivacyPolicy() {
    this.dialog.open(PrivacyPolicyComponent);
  }
  openTermsOfService() {
    this.dialog.open(TermsOfServiceComponent);
  }
  openCancellationPolicy() {
    this.dialog.open(CancellationPolicyComponent);
  }
}
