import PropTypes from 'prop-types';

export const BasicIngridientPropTypes: any = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired  
};