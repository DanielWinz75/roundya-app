export class Place {
    _id?: string;
    subject: 'singular';
    predicate: '';
    object: '';
    text: '';
    owner: '';
    location: {
      type: 'Point';
      coordinates: [];
    };
}
