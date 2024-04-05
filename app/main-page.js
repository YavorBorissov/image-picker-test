import { createViewModel } from "./main-view-model";
import * as imagePickerPlugin from "@nativescript/imagepicker";
import { check, request } from "@nativescript-community/perms";

export function onNavigatingTo(args) {
  const page = args.object;
  page.bindingContext = createViewModel();
}

export function pickImage(args) {
  const uploadButton = args.object;
  const page = uploadButton.page;

  let imagePickerObj = imagePickerPlugin.create({
    mode: "single",
  });

  uploadButton.off("loaded");

  uploadButton.on("tap", () => {
    imagePickerObj
      .authorize()
      .then((authResult) => {
        console.log(authResult);
        if (authResult.authorized) {
          return imagePickerObj.present().then((selection) => {
            selection.forEach((selected) => {
              const selectedImage = page.getViewById("selectedImage");
              selectedImage.src = selected.asset;
            });
          });
        } else {
          console.log("Unauthorized!");
        }
      })
      .then(
        check("photo").then((response) => {
          console.log(response);
        })
      )
      .catch(function (e) {
        console.error(e);
      });
  });
}
