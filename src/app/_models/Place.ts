export class Place {
    _id?: string;
    subject: 'singular';
    predicate: '';
    object: '';
    text: '';
    ownerId: '';
    url: '';
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
}
