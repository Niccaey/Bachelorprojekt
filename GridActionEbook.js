import { modelUtil } from '../util/modelUtil';
import { constants } from '../util/constants';
import { Model } from '../externals/objectmodel';

class GridActionEbook extends Model({
    id: String,
    modelName: String,
    modelVersion: String,
    openBook: [String],
    action: [String],
    stepPage: [Number],
    stepChapter: [Number],
    stepFontsize: [Nummer],
}) {
    constructor(properties, elementToCopy) {
        properties = modelUtil.setDefaults(properties, elementToCopy, GridActionEbook);
        super(properties);
        this.id = this.id || modelUtil.generateId(GridActionEbook.getModelName());
    }

    static getModelName() {
        return 'GridActionEbook';
    }
}

gridactionebook.actions = {
    EB_OPEN: 'EB_OPEN'
};

GridActionEbook.defaults({
    id: '', //will be replaced by constructor
    modelName: GridActionEbook.getModelName(),
    modelVersion: constants.MODEL_VERSION,
    title: '',
    //stepChapter: 1,
    //stepPage: 1,
    //stepFontsize: 10,
    openBook: ''
});

export { GridActionEbook };
