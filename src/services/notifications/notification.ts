import message from "antd/lib/message";
import { en } from "../context/language-ctx";

let counter = 1;

export default class Notification {
  constructor(private id = counter++) {}

  loading(content = en ? "Loading..." : "Chargement...") {
    message.loading({ content, key: this.id, duration: 0 });
  }

  success(content = en ? "Success!" : "Succès !") {
    message.success({ content, key: this.id });
  }

  error(content: string) {
    console.error(content);
    message.error({
      content: "Error: " + content,
      key: this.id,
      duration: 0,
      style: { cursor: "pointer" },
      onClick: () => message.destroy(this.id),
    });
  }

  close() {
    message.destroy(this.id);
  }
}
