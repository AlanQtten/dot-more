# dot-more

## 补全功能
```typescript
// ${c}表示光标位置

a.b.c.log    
// console.log(a.b.c)

a.b.c.log_wm 
// console.log(`a.b.c`, a.b.c)

a.b.c.if    
/**
 * if(a.b.c) {
 *   ${c}
 * }
 */

a.b.c.for
/**
 * const l = a.b.c.length
 * for (let i${c} = 0; i${c} < l; i${c}++) {
 *   const item = a.b.c[i${c}]
 *   
 * }
 */
```