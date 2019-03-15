export class Place {
    _id?: string;
    expires : '';
    subject: '';
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
