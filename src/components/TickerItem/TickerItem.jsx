import React, { Component } from 'react';

import Modal from '../Modal/Modal';
import ListItem from '../ListItem/ListItem';
import './TickerItem.scss';

/** Used in PortfolioList */
class TickerItem extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isListShown: true,
    };
  }

  toggleTradesModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  toggleList = () => {
    const { isListShown } = this.state;
    this.setState({ isListShown: !isListShown });
  }

  render() {
    const { buys, ticker, actions, portfolioValue } = this.props;
    const { isModalOpen, isListShown } = this.state;

    // calculate the totals for price and shares
    const totalShares = buys.reduce((prev, current) => prev + current.shares, 0);
    const value = buys.reduce((prev, current) => prev + (current.price * current.shares), 0);
    const totalHoldings = value / portfolioValue * 100;

    return (
      <li styleName="ticker-item">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          styleName="ticker"
          onClick={this.toggleList}
          role="button"
          tabIndex="0"
        >
          <div styleName="column-container">
            <p>{ticker}</p>
            <p>{totalShares} shares</p>
          </div>
          <p styleName="col-value">${Number(value).toFixed(2)}</p>
          <p styleName="col-value">{Number(totalHoldings).toFixed(2)}%</p>
        </div>
        {isListShown && (
          <ol styleName="buys-list">
            {buys.map((t, i) => (
              <ListItem
                actions={actions}
                key={t.shares + t.purchasePrice}
                purchasePrice={t.purchasePrice}
                shares={t.shares}
                index={i}
                ticker={ticker}
              />
            ))}
            <li styleName="cell-add-trade">
              <button
                type="button"
                onClick={this.toggleTradesModal}
              >
                + Add trade
              </button>
              {isModalOpen && (
                <Modal onCloseRequest={this.toggleTradesModal}>
                  <AddTradesModal />
                </Modal>)
              }
            </li>
          </ol>)
        }
      </li>
    );
  }
}

const AddTradesModal = () => (
  <div styleName="container">
    <p>what up hello</p>
    <div styleName="row-container">
      <p>Ticker</p>
      <input type="text" />
    </div>
    <div styleName="row-container">
      <p>Shares</p>
      <input type="text" />
    </div>
    <div styleName="row-container">
      <p>Purchase Price</p>
      <input type="text" />
    </div>
  </div>
);

export default TickerItem;
