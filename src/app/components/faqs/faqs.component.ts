import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  faqs: any = [];

  constructor(private commonService: CommonService) {
  }

  async ngOnInit() {
    (await this.commonService.getFaqs()).subscribe((res: any) => {
      this.faqs = res.data.faqData.map((faqData: any) => faqData.faqs).flat()
    })
  }

  // faqsData = [
  //   {
  //     question: 'Why Sanitation is important?',
  //     answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
  //   excepturi incidunt ipsum deleniti labore, tempore non nam doloribus blanditiis
  //   veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?`
  //   },
  //   {
  //     question: 'What materials used for cleaning?',
  //     answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
  //   excepturi incidunt ipsum deleniti labore, tempore non nam doloribus blanditiis
  //   veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?`
  //   },
  //   {
  //     question: 'Why Click2Clean?',
  //     answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
  //   excepturi incidunt ipsum deleniti labore, tempore non nam doloribus blanditiis
  //   veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?`
  //   },
  //   {
  //     question: 'What are the terms & Conditions?',
  //     answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
  //   excepturi incidunt ipsum deleniti labore, tempore non nam doloribus blanditiis
  //   veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?`
  //   },
  //   {
  //     question: 'Why Click2Clean?',
  //     answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
  //   excepturi incidunt ipsum deleniti labore, tempore non nam doloribus blanditiis
  //   veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?`
  //   },
  // ]

  expandedIndex = 0;
}
