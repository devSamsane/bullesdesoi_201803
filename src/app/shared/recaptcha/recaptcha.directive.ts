import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  NgZone,
  AfterViewInit,
  Injector,
  InjectionToken,
  Injectable,
  Inject,
  forwardRef,
  EventEmitter,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export interface RecaptchaConfig {
  theme?: 'dark' | 'light';
  type?: 'audio' | 'image';
  size?: 'compact' | 'normal';
  tabindex?: number;
}

declare const grecaptcha: any;

declare global {
  interface Window {
    grecaptcha: any;
    reCaptchaLoad: () => void;
  }
}

export const RECAPTCHA_URL = new InjectionToken('RECAPTCHA_URL');

@Injectable()
export class ReCaptchaAsyncValidator {

  constructor(private http: Http, @Inject(RECAPTCHA_URL) private url) { }

  validateToken(token: string) {
    return (_: AbstractControl) => {
      return this.http.get(this.url, { params: { token } })
        .map(res => res.json())
        .map(res => {
          if (!res.success) {
            return { tokenInvalid: true };
          }
          return null;
        });
    };
  }
}

@Directive({
  selector: '[bdsRecaptcha]',
  exportAs: 'bdsRecaptcha',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RecaptchaDirective),
    multi: true
  },
    ReCaptchaAsyncValidator
  ]

})
export class RecaptchaDirective implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() key: string;
  @Input() config: RecaptchaConfig = {};
  @Input() lang: string;

  @Output() captchaResponse = new EventEmitter<string>();
  @Output() captchaExpired = new EventEmitter();

  private widgetId: number;
  private changed: (value: string) => void;
  private touched: (value: string) => void;
  private control: FormControl;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    private injector: Injector,
    private reCaptchaAsyncValidator: ReCaptchaAsyncValidator
  ) { }

  ngOnInit() {
    this.registerReCaptchaCallback();
    this.addScript();

  }

  ngAfterViewInit() {
    this.control = this.injector.get(NgControl).control;
    this.setValidator();
  }

  getId() {
    return this.widgetId;
  }

  private setValidator() {
    // setTimeout(() => this.control.setValidators(Validators.required), 0);

    this.control.setValidators(Validators.required);
    setTimeout(() => this.control.updateValueAndValidity(), 0);
    // this.control.updateValueAndValidity();
  }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  isExpired() {
    this.ngZone.run(() => {
      this.captchaExpired.emit();
      this.changed(null);
      this.touched(null);
    });
  }

  isSucceeded(token: string) {
    this.ngZone.run(() => {
      this.verifyToken(token);
      this.captchaResponse.next(token);
      this.changed(token);
      this.touched(token);
    });
  }

  verifyToken(token: string) {
    this.control.setAsyncValidators(this.reCaptchaAsyncValidator.validateToken(token));
    this.control.updateValueAndValidity();
  }

  registerReCaptchaCallback() {
    window.reCaptchaLoad = () => {
      const config = {
        ...this.config,
        'sitekey': this.key,
        'callback': this.isSucceeded.bind(this),
        'expired-callback': this.isExpired.bind(this)
      };
      this.widgetId = this.render(this.element.nativeElement, config);
    };
  }

  private render(element: HTMLElement, config) {
    return grecaptcha.render(element, config);
  }

  reset(): void {
    if (!this.widgetId) {
      return;
    }
    grecaptcha.reset(this.widgetId);
    this.changed(null);
  }

  getResponse(): string {
    if (!this.widgetId) {
      return grecaptcha.getResponse(this.widgetId);
    }
  }

  addScript() {
    const script = document.createElement('script');
    const lang = this.lang ? '&hl=' + this.lang : '';
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

}
