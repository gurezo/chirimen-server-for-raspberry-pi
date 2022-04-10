import {
  GpioApiRequestFactory,
  GpioApiResponseProcessor,
} from "../apis/GpioApi";
// import * as models from '../models/all';
import { Configuration } from "../configuration";
import { ObservableGpioApi } from "./ObservableAPI";

export interface GpioApiGpioAccessRequest {}

export interface GpioApiGpioPortWriteRequest {
  /**
   * write value
   * @type number
   * @memberof GpioApigpioPortWrite
   */
  writeValue: number;
}

export interface GpioApiGpioPortsGetRequest {
  /**
   * port number
   * @type number
   * @memberof GpioApigpioPortsGet
   */
  portNumber: number;
}

export class ObjectGpioApi {
  private api: ObservableGpioApi;

  public constructor(
    configuration: Configuration,
    requestFactory?: GpioApiRequestFactory,
    responseProcessor?: GpioApiResponseProcessor
  ) {
    this.api = new ObservableGpioApi(
      configuration,
      requestFactory,
      responseProcessor
    );
  }

  /**
   * GPIO Access
   * @param param the request object
   */
  public gpioAccess(
    param: GpioApiGpioAccessRequest = {},
    options?: Configuration
  ): Promise<void> {
    return this.api.gpioAccess(options).toPromise();
  }

  /**
   * GPIO Port Write
   * @param param the request object
   */
  public gpioPortWrite(
    param: GpioApiGpioPortWriteRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api.gpioPortWrite(param.writeValue, options).toPromise();
  }

  /**
   * GPIO Port Get
   * @param param the request object
   */
  public gpioPortsGet(
    param: GpioApiGpioPortsGetRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api.gpioPortsGet(param.portNumber, options).toPromise();
  }
}
