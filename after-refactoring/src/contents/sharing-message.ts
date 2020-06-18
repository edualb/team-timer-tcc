import { Membro } from "./membro";

export class SharingMessageContent {
  title: string;
  timeWaited: string;
  standupTime: string;
  timeLimit: string;

  message: string;
  members: Membro[] = [];
}