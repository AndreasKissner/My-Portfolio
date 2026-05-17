import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat-widget',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss',
})
export class ChatWidgetComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  private sessionId = crypto.randomUUID();

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  isOpen = false;
  isLoading = false;
  userInput = '';

  /** Initial bot greeting message shown on first open */
  messages: ChatMessage[] = [
    {
      role: 'bot',
      text: 'Hallo! Ich bin Andreas Kissner – oder genauer gesagt, eine digitale Kopie von mir. Schön, dass du da bist! Was kann ich für dich tun?',
    },
  ];

  /** Toggles the chat overlay open or closed */
  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  /** Sends user message, fetches bot response and updates the view */
  async sendMessage(): Promise<void> {
    const text = this.userInput.trim();
    if (!text) return;

    this.addMessage('user', text);
    this.userInput = '';
    this.isLoading = true;
    this.scrollToBottom();

    const botResponse = await this.fetchBotResponse(text);
    this.isLoading = false;
    this.addMessage('bot', botResponse);
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  /** Adds a message to the messages array */
  private addMessage(role: 'user' | 'bot', text: string): void {
    this.messages.push({ role, text });
  }

  /** Sends a POST request to the n8n webhook and returns the bot response */
  private async fetchBotResponse(text: string): Promise<string> {
    try {
      const response = await fetch(
       'https://n8n.andreas-kissner.cloud/webhook/299b772d-2ec5-459d-b357-7e911e05a519',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, sessionId: this.sessionId }),
        },
      );
      const data = await response.json();
      return data.output || 'Hmm, da ging was schief.';
    } catch {
      return 'Verbindung fehlgeschlagen. Versuch es nochmal.';
    }
  }

  /** Scrolls the message container to the bottom after a short delay */
  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.messageContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }
}
