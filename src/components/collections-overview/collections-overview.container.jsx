import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import CollectionOverview from "./collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;
