# ngux

## ngux-dropdown

Provides a dropdown component container that can be triggered by any element identified with a `[dropdown]` attribute

Add `NguxModule` to `app.module.ts`

```ts
import { NguxModule } from 'ngux';

imports: [
  ...
  NguxModule
]
```

```html
<a dropdown="some-trigger">Open dropdown</a>

<ngux-dropdown trigger="some-trigger" [width]="400">
  <div class="container">
    ...
  </div>
</ngux-dropdown>
```