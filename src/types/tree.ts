// type Leaf<T> = {
//     data: T;
// }

// type InnerNode<T, C> = Leaf<T> & {
//     children: C[]
// }

// type Tree2<A,B> = InnerNode<A, Leaf<B>>;
// type Tree3<A,B,C> = InnerNode<A, Tree2<B,C>>;

// type RoomNode = {
//     room: Zone;
// }
// type DeviceNode = {
//     device: Device;
//     type: Identifiable.type
// }
// const rooms: Tree2<RoomNode, DeviceNode>[] = [];
