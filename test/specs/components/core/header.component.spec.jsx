var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Header = require('../../../../web/app/components/core/header.component.jsx');
var menuStore = require('../../../../web/app/components/menu/menu.store');
var testHelper = require('../../../test-helper');
var _ = require('lodash');
var Link = require('react-router').Link;

describe('header component', function() {
  beforeEach(function() {
    testHelper.resetStores('Menu');

    this.component = testHelper.getRouterComponent(Header);
  });

  it('should have correct initial state', function() {
    expect(this.component.state.menu).to.deep.equal([{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }]);
  });

  it('should update menu when menu store changes', function() {
    menuStore.update({
      menuName: 'preventDoubleClick'
    });

    expect(this.component.state.menu).to.deep.equal([{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }, {
      href: '/with-resolves',
      display: 'With Resolves'
    }]);
  });

  it('should render the menu elements', function() {
    expectedMenuData = [{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }];
    var ulElement = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'ul');

    expect(ulElement).to.be.defined;

    liElements = reactTestUtils.scryRenderedDOMComponentsWithTag(ulElement, 'li');

    expect(liElements.length).to.equal(expectedMenuData.length);

    _.forEach(liElements, function(liElement, key) {
      var linkProps = reactTestUtils.findRenderedComponentWithType(liElement, Link).props;

      expect(linkProps.to).to.equal(expectedMenuData[key].href);
      expect(linkProps.children).to.equal(expectedMenuData[key].display);
    });
  });
});
