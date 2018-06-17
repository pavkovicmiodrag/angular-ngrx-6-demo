import { Pipe } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe {

  transform(value: any) {
    console.log("Capitalize ", value);
	  if (value) {
      console.log("Capitalize after", value.charAt(0).toUpperCase() + value.slice(1));
      	return value.charAt(0).toUpperCase() + value.slice(1);
	  }

	  return value;
  }

}
