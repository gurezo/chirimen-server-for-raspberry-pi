import {
  GpioApiRequestFactory,
  GpioApiResponseProcessor,
} from "../apis/GpioApi";
// import * as models from '../models/all';
import { Configuration } from "../configuration";
import { ObservableGpioApi } from "./ObservableAPI";

export class PromiseGpioApi {
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
   */
  public gpioAccess(_options?: Configuration): Promise<void> {
    const result = this.api.gpioAccess(_options);
    return result.toPromise();
  }

  /**
   * GPIO Port Write
   * @param writeValue write value
   */
  public gpioPortWrite(
    writeValue: number,
    _options?: Configuration
  ): Promise<void> {
    const result = this.api.gpioPortWrite(writeValue, _options);
    return result.toPromise();
  }

  /**
   * GPIO Port Get
   * @param portNumber port number
   */
  public gpioPortsGet(
    portNumber: number,
    _options?: Configuration
  ): Promise<void> {
    const result = this.api.gpioPortsGet(portNumber, _options);
    return result.toPromise();
  }
}
