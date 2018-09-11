/* tslint:disable:interface-name */

export interface Global extends NodeJS.Global {
    [property: string]: any;
}

export default Global;
