export interface Settings {
  BOTAPIPORT: number;
  STRAPIURL: string;
  STRAPIUSERNAME: string;
  STRAPIPASSWORD: string;
  INTERNALSERVICESSECRET: string;
  USEPROXY: true;
  PROXYHOST: string;
  PROXYPORT: string;
  CONNECTTOINSTAGRAM: boolean;
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

  // username?: string; // we can get this later via igClient.user.info(pk)
  // full_name?: string; // we can get this later via igClient.user.info(pk)
  // messages and stories
}

export interface IgLead {
  _id: string;
  id: string;
  user_id: BigInteger;
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

  maybe for later:
  hd_profile_pic_versions

  */
}

export enum IgActionFlag{
  AGB = "ABG",
  GOOGLERATING = "GOOGLERATING",
  TICKET = "TICKET"


}

export interface IgAction {
  business: Business | string;
  ig_lead: IgLead | string;
  confirmed?: boolean; // confirmed means, that the action really happended in instagram. This is acutomatically true for all actions we receive from instagram realtime client.
  direction_b_to_l: boolean;
  content_media?: any;
  content_text?: string;
  thread_id?: string;
  item_id?: string;
  action_type: BotEmittingEvents;
  flag?: IgActionFlag
}

// data from API is cast to this class. id and _id are the same
export interface Business {
  _id: string;
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
  business_settings: {
    _id: string;
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
        follow_needed: true;
        bot_version: string;
        _id: string;
        story_mention_reply1: string;
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
    business: string;
    id: string;
  };
  ig_leads: IgLead[];
  id: string;
}
