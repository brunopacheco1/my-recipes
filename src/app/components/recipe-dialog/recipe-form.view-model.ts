import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

export class RecipeFormViewModel {
  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [
      Validators.required,
      (control: AbstractControl): { [key: string]: any } | null => {
        const notValid = !/^(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png)$/.test(
          control.value
        );
        return notValid ? { notValid: { value: control.value } } : null;
      }
    ])
  });

  get name(): AbstractControl {
    return this.form.get("name");
  }

  get description(): AbstractControl {
    return this.form.get("description");
  }

  get imageUrl(): AbstractControl {
    return this.form.get("imageUrl");
  }

  get type(): AbstractControl {
    return this.form.get("type");
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
