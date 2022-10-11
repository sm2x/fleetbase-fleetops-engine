import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import { format, formatDistanceToNow } from 'date-fns';

export default class EntityModel extends Model {
  /** @ids */
  @attr('string') public_id;
  @attr('string') internal_id;
  @attr('string') _import_id;
  @attr('string') payload_uuid;
  @attr('string') company_uuid;
  @attr('string') customer_uuid;
  @attr('string') driver_assigned_uuid;
  @attr('string') tracking_number_uuid;
  @attr('string') destination_uuid;
  @attr('string') photo_uuid;

  /** @relationships */
  @belongsTo('payload') payload;
  @belongsTo('customer', { polymorphic: true, async: false }) customer;
  @belongsTo('facilitator', { polymorphic: true, async: false }) facilitator;
  @belongsTo('driver') driver;
  @belongsTo('customer', { polymorphic: true, async: false }) customer;
  @belongsTo('tracking-number') trackingNumber;
  @belongsTo('place') destination;
  @belongsTo('file') photo;

  /** @attributes */
  @attr('string') name;
  @attr('string') type;
  @attr('string') description;
  @attr('string', {
    defaultValue:
      'https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/parcels/medium.png',
  })
  photo_url;
  @attr('string', {
    defaultValue: 'USD',
  })
  currency;
  @attr('string') barcode;
  @attr('string') tracking;
  @attr('string') qr_code;
  @attr('string') weight;
  @attr('string', {
    defaultValue: 'g',
  })
  weight_unit;
  @attr('string') length;
  @attr('string') width;
  @attr('string') height;
  @attr('string', {
    defaultValue: 'cm',
  })
  dimensions_unit;
  @attr('string') declared_value;
  @attr('string') tracking;
  @attr('string') sku;
  @attr('string') price;
  @attr('string') sale_price;
  @attr('string') _import_id;
  @attr('string') slug;
  @attr('raw') meta;

  /** @dates */
  @attr('date') deleted_at;
  @attr('date') created_at;
  @attr('date') updated_at;

  /** @computed */
  @computed('length', 'width', 'height', 'dimensions_unit') get dimensions() {
    return (
      this.length +
      'x' +
      this.width +
      'x' +
      this.height +
      ' ' +
      this.dimensions_unit
    );
  }

  @computed('length', 'dimensions_unit') get displayLength() {
    return this.length + this.dimensions_unit;
  }

  @computed('width', 'dimensions_unit') get displayWidth() {
    return this.width + this.dimensions_unit;
  }

  @computed('height', 'dimensions_unit') get displayHeight() {
    return this.height + this.dimensions_unit;
  }

  @computed('weight', 'weight_unit') get displayWeight() {
    return this.weight + this.weight_unit;
  }

  @computed('updated_at') get updatedAgo() {
    return formatDistanceToNow(this.updated_at);
  }

  @computed('updated_at') get updatedAt() {
    return format(this.updated_at, 'PPP p');
  }

  @computed('updated_at') get updatedAtShort() {
    return format(this.updated_at, 'PP');
  }

  @computed('created_at') get createdAgo() {
    return formatDistanceToNow(this.created_at);
  }

  @computed('created_at') get createdAt() {
    return format(this.created_at, 'PPP p');
  }

  @computed('created_at') get createdAtShort() {
    return format(this.created_at, 'PP');
  }
}
