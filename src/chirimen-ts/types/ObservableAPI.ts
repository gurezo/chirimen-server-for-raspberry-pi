import {
  GpioApiRequestFactory,
  GpioApiResponseProcessor,
} from "../apis/GpioApi";
// import * as models from '../models/all';
import { Configuration } from "../configuration";
import { RequestContext, ResponseContext } from "../http/http";
import { from, map, mergeMap, Observable, of } from "../rxjsStub";

export class ObservableGpioApi {
  private requestFactory: GpioApiRequestFactory;
  private responseProcessor: GpioApiResponseProcessor;
  private configuration: Configuration;

  public constructor(
    configuration: Configuration,
    requestFactory?: GpioApiRequestFactory,
    responseProcessor?: GpioApiResponseProcessor
  ) {
    this.configuration = configuration;
    this.requestFactory =
      requestFactory || new GpioApiRequestFactory(configuration);
    this.responseProcessor =
      responseProcessor || new GpioApiResponseProcessor();
  }

  /**
   * GPIO Access
   */
  public gpioAccess(_options?: Configuration): Observable<void> {
    const requestContextPromise = this.requestFactory.gpioAccess(_options);

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise);
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      );
    }

    return middlewarePreObservable
      .pipe(
        mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))
      )
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response);
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            );
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.gpioAccess(rsp)
            )
          );
        })
      );
  }

  /**
   * GPIO Port Write
   * @param writeValue write value
   */
  public gpioPortWrite(
    writeValue: number,
    _options?: Configuration
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.gpioPortWrite(
      writeValue,
      _options
    );

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise);
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      );
    }

    return middlewarePreObservable
      .pipe(
        mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))
      )
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response);
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            );
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.gpioPortWrite(rsp)
            )
          );
        })
      );
  }

  /**
   * GPIO Port Get
   * @param portNumber port number
   */
  public gpioPortsGet(
    portNumber: number,
    _options?: Configuration
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.gpioPortsGet(
      portNumber,
      _options
    );

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise);
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      );
    }

    return middlewarePreObservable
      .pipe(
        mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))
      )
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response);
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            );
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.gpioPortsGet(rsp)
            )
          );
        })
      );
  }
}
