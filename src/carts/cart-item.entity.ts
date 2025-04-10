import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({ type: 'uuid' })
  cart_id: string;

  @PrimaryColumn({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'integer', check: 'count > 0' })
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}