export class Place {
    _id?: string;
    subject: 'singular';
    predicate: '';
    object: '';
    text: '';
    ownerId: '';
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
}
