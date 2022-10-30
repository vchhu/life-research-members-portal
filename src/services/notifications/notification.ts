import message from "antd/lib/message";

let counter = 1;

export default class Notification {
  constructor(private id = counter++) {}

  loading(content = "Loading...") {
    message.loading({ content, key: this.id, duration: 0 });
  }

  success(content = "Success!") {
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
