import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";


export class CustonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('THIS IS INTERCEPTING THE REQUEST')

    return next.handle().pipe(
      map((data) => {
        console.log('THIS IS INTERCEPTING THE RESPONSE')
        return data
      })
    )
  }

}