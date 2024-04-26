import { modelUtil } from '../util/modelUtil';
import { constants } from '../util/constants';
import { Model } from '../externals/objectmodel';

class GridActionEbook extends Model({
    id: String,
    modelName: String,
    modelVersion: String,
    action: [String],
    bookId: [String],
    stepPage: [Number]
}) {
    constructor(properties, elementToCopy) {
        properties = modelUtil.setDefaults(properties, elementToCopy, GridActionEbook);
        super(properties);
        this.id = this.id || modelUtil.generateId('grid-action-ebook');
    }

    static getModelName() {
        return 'GridActionEbook';
    }

    static getActions() {
        return Object.keys(GridActionEbook.actions);
    }
}

GridActionEbook.defaults({
    id: '', //will be replaced by constructor
    modelName: GridActionEbook.getModelName(),
    modelVersion: constants.MODEL_VERSION,
    bookId: '',
});

export { GridActionEbook };
