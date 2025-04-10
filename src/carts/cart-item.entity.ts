// Dodaj import Check
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, Check } from 'typeorm'; 
import { Cart } from './cart.entity';

@Entity('cart_items')
// Dodaj dekorator @Check na poziomie encji
@Check(`"count" > 0`) // Użyj podwójnych cudzysłowów wokół nazwy kolumny dla pewności
export class CartItem {
  @PrimaryColumn({ type: 'uuid' })
  cart_id: string;

  @PrimaryColumn({ type: 'uuid' })
  product_id: string;

  // Uprość dekorator @Column, usuwając opcję check
  @Column('integer') // Możesz też spróbować @Column() i polegać na inferencji z 'count: number'
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
