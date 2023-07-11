import { Component, ViewEncapsulation } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { CommonService } from 'src/app/services/common/common.service';

declare let window: any;

@Component({
  selector: 'app-bill-desk',
  templateUrl: './bill-desk.component.html',
  styleUrls: ['./bill-desk.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class BillDeskComponent {

  constructor(private device: Device,
    private commonService: CommonService) { }

  async createOrder(confirmationId: string) {
    const publicIpAddress: any = await (await this.commonService.getPublicIpAddress()).toPromise();

    const orderData = {
      confirmationId: confirmationId,
      device: {
        deviceid: this.device.uuid,
        init_channel: 'app',
        ip: publicIpAddress?.ip,
        appid: 'consumer',
        accept_header: 'text/html',
        user_agent: navigator.userAgent
      }
    };

    (await this.commonService.createOrder(orderData)).subscribe((res: any) => {
      console.log('res', res);
      if (res.status === 'SUCCESS') {
        const data = res.data;
        this.loadBillDesk(data.bdOrderId, data.authToken);
      }
    });
  }

  loadBillDesk(bdOrderId: string, authToken: string) {

    const flow_config = {
      merchantId: 'UATATWMV2',
      bdOrderId,
      authToken,
      childWindow: true,
      prefs: { payment_categories: ['card', 'emi', 'nb', 'upi', 'wallets', 'qr', 'gpay'] }
    };
    const config = {
      responseHandler: (response: any) => console.log('payemnt status', response),
      merchantLogo: '/assets/click2clean-logo.png',
      flowConfig: flow_config,
      flowType: 'payments'
    };
    window.loadBillDeskSdk(config);
  }
}
