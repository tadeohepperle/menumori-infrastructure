export interface Settings {
  BOTAPIPORT: number;
  PAPIPORT: number;
  STRAPIURL: string;
  STRAPIUSERNAME: string;
  STRAPIPASSWORD: string;
  INTERNALSERVICESSECRET: string;
  USEPROXY: boolean;
  PROXYHOST: string;
  PROXYPORT: string;
  CONNECTTOINSTAGRAM: boolean;
  FRONTENDURL: string;
}

import { EventEmitter } from "events";
import STARTUPPERFORMER from "./STARTUPPERFORMER";

export class SERVICE extends EventEmitter {
  SETTINGS: Settings;
  STARTUPPERFORMER: STARTUPPERFORMER;

  constructor(startupperformer: STARTUPPERFORMER) {
    super();
    this.SETTINGS = startupperformer.SETTINGS;
    this.STARTUPPERFORMER = startupperformer;
  }
}

export enum BotInstanceStatus {
  ACTIVE = "ACTIVE",
  ERROR = "ERROR",
  INACTIVE = "INACTIVE",
}

export enum BotEmittingEvents {
  StoryMention = "StoryMention",
  PostMention = "PostMention",
  DirectMessage = "DirectMessage",
  Subscribe = "Subscribe",
  PostLike = "PostLike",
  Unidentified = "Unidentified",
  SendPhoto = "SendPhoto",
}

export interface IgIncomingEventData {
  date: Date;
  // replaces ActionInfo and ActingUser
  type: BotEmittingEvents;
  user_id?: number;
  thread_id?: string;
  item_id?: string;
  media_url?: string;
  text?: string;
  streakshortid?: string;
}

export interface IgLead {
  _id: string;
  id: string;
  user_id: number;
  businesses: (Business | string)[];
  // propoerties requested through igClient.user.info(pk):
  username?: string;
  biography?: string;
  profile_pic_url?: string;
  full_name?: string;
  media_count?: number;
  follower_count?: number;
  following_count?: number;
  mutual_followers_count?: number;
  is_verified?: boolean;
  is_private?: boolean;
  has_anonymous_profile_picture?: boolean;
  following_tag_count?: number;
  external_url?: string;
  is_business?: boolean;
  whatsapp_number?: string;

  /*

  createdAt?: string;
  maybe for later:
  hd_profile_pic_versions

  */
}

export enum IgActionFlag {
  B_AGB = "B_AGB", // von business gesendet
  B_AGBCOMPLYREPLY = "B_AGBCOMPLYREPLY",
  B_TICKET = "B_TICKET",
  C_AGBCOMPLY = "C_AGBCOMPLY", // message von seite des nutzers
  C_STORYMENTION = "C_STORYMENTION", // can also be seen in ig.action.action_type
  C_POSTMENTION = "C_POSTMENTION", // can also be seen in ig.action.action_type
}

export interface IgAction {
  business: Business | string;
  lead: IgLead | string;
  confirmed?: boolean; // confirmed means, that the action really happended in instagram. This is acutomatically true for all actions we receive from instagram realtime client.
  direction_b_to_l: boolean;
  content_media?: any;
  content_text?: string;
  thread_id?: string;
  item_id?: string;
  action_type: BotEmittingEvents;
  flag?: IgActionFlag | null;
  createdAt?: string;
  streakshortid?: string;
  id?: string;
  _id?: string;
  simulated?: boolean;
}

export interface BusinessCategory {
  id: string;
  _id: string;
  title: string;
  business_settings: [string | BusinessSettings];
}

export interface BusinessSettings {
  _id: string;
  business: Business | string;
  rating_url: string;
  rating_platform: string;
  business_category: BusinessCategory | string;
  description: string;
  cover_image: {
    url: string;
  }[];
  adress: {
    _id: string;
    street_name: string;
    house_number: number;
    zip_code: number;
    city: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  ig_settings: {
    _id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    google_business_link: string;
    ig_behavior_settings: {
      follow_needed: true; // currently not used
      bot_version: string;
      _id: string;
      story_mention_reply1: string;
      agb_complied_reply1: string;
      agb_complied_reply2: string;
      comply_text: string;
      createdAt: string;
      updatedAt: string;
      activated: boolean;
      id: string;
    };
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  contact: {
    _id: string;
    email: string;
    phone: string;
    full_name: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  title: string;
  gift: string;
  gift_deadline_days: number;
  id: string;
}

// data from API is cast to this class. id and _id are the same
export interface Business {
  _id: string;
  short_id: string;
  slugname: string;
  createdAt: string;
  updatedAt: string;
  business_data: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    business: string;
    ig_data: {
      bot_instance_status: BotInstanceStatus;
      _id: string;
      follower_count: number;
      ig_bio: string;
      full_name: string;
      createdAt: string;
      updatedAt: string;
      id: string;
      ig_user_id: number;
      ig_session_store: object;
      last_session_login: Date;
      last_password_login: Date;
    };
    plan_settings: {
      payment_interval: string;
      payment_method: string;
      _id: string;
      leads_per_month: number;
      plan_end: string;
      plan_start: string;
      payment_per_interval: number;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
    id: string;
  };
  business_settings: BusinessSettings;
  leads: IgLead[];
  id: string;
}

// all gifts (sent out tickets) are logged to the database
export interface Gift {
  business: Business | string;
  lead: IgLead | string;
  content_name?: string;
  fulfilled?: boolean;
  date_ticket_fulfilled?: Date;
  date_ticket_sent?: Date;
  createdAt?: string;
  updatedAt?: string;
  streakshortid?: string;
  id?: string;
  _id?: string;
}
