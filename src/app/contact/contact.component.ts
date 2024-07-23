import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  user: { name: string; email: string; message: string } = { name: '', email: '', message: '' };

  sendEmail() {
    const templateParams = {
      from_name: this.user.name,
      from_email: this.user.email,
      message: this.user.message,
    };

    emailjs.send('default_service', 'template_zy99l3g', templateParams, 'iwl0o4GVVqF4qsloq')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to send the message. Please try again.');
      });
  }
}
