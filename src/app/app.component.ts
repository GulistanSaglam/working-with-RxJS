import { Component, DestroyRef, effect, inject, OnInit,signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop'


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
clickCount = signal(0)
clickCount$ = toObservable(this.clickCount)
 private destroyRef = inject(DestroyRef)


 ngOnInit(): void {
  const subscription = this.clickCount$.subscribe({
    next: (val) => console.log(`Clicked button ${this.clickCount()} times.`)
  });
  this.destroyRef.onDestroy(()=>{
    subscription.unsubscribe();
  })
 }


 onClick(){
    this.clickCount.update(prevCount => prevCount + 1)
 }
}


