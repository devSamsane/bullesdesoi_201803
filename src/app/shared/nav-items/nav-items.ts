import { Injectable } from '@angular/core';

export interface NavItem {
  id: string;
  name: string;
  type: string;
  route: string;
}

export interface NavCategory {
  id: string;
  name: string;
  type: string;
  route?: string;
  items?: NavItem[];
}

// Initialisation des categories
const NAV_MENU = 'navigation';
// const VOTRE_SOPHROLOGUE = 'votre sophrologue';
// const ESPACE_CLIENT = 'espace client';
// const INFORMATIONS = 'informations pratiques';

// Initialisatioin de l'objet SECTIONS
const SECTIONS: { [key: string]: NavCategory[] } = {
  [NAV_MENU] : [
    {
      id: 'applications',
      name: 'Applications',
      type: 'toggle',
      route: '/applications',
      items: [
        { id: 'perinatalite', name: 'Périnatalité', type: 'link', route: '/perinatalite' },
        { id: 'enfance', name: 'Enfance', type: 'link', route: '/applications/enfance' },
        { id: 'adolescence', name: 'Adolescence', type: 'link', route: '/applications/adolescence' },
        { id: 'adulte', name: 'Adulte', type: 'link', route: '/applications/adulte' },
        { id: 'senior', name: 'Senior', type: 'link', route: '/applications/senior' }
      ]
    },
    {
      id: 'about_me',
      name: 'Votre sophrologue',
      type: 'toggle',
      items: [
        { id: 'aboutme', name: 'A mon propos', type: 'link', route: '/a_mon_propos'},
        { id: 'deontologie', name: 'Code de déontologie', type: 'link', route: '/deontologie'}
      ]
    },
    {
      id: 'espace_client',
      name: 'Espace client',
      type: 'toggle',
      items: [
        { id: 'appointment', name: 'Prendre rendez-vous', type: 'link', route: '/rdv'},
        { id: 'signup', name: 'S\'inscrire', type: 'link', route: '/signup' },
        { id: 'signin', name: 'Se connecter', type: 'link', route: '/signin' }
      ]
    },
    {
      id: 'informations',
      name: 'Informations Pratiques',
      type: 'toggle',
      items: [
        { id: 'seances', name: 'Description des seances', type: 'link', route: '/prestations' },
        { id: 'tarifs', name: 'Tarification', type: 'link', route: '/tarification'}
      ]
    }
  ]
};

const ALL_NAV_CATEGORY = SECTIONS[NAV_MENU].reduce(
  (result, category) => result.concat(category.items), []
);

@Injectable()
export class NavigationItems {

  getCategories(section: string): NavCategory[] {
    return SECTIONS[section];
  }

  getItems(section: string): NavItem[] {
    if (section === NAV_MENU) {
      return ALL_NAV_CATEGORY;
    }
    return [];
  }


}
