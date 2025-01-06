/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { constants } from './constants';

initLanguage(constants.locale.appLanguage)
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));

async function initLanguage(locale: string): Promise<void> {
  if (locale === 'en') {
    return;
  }

  const json = JSON.parse(
    await fetch(`/i18n/messages.${locale}.json`).then((j) => j.text()),
  );

  loadTranslations(json.translations);

  $localize.locale = locale;

  const localeModule = await import(
    `../node_modules/@angular/common/locales/mk`
  );

  registerLocaleData(localeModule.default);
}
