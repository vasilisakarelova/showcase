import React, { Component } from 'react'
import * as css from 'classnames'
import moment from 'moment'

export default class extends Component {
  state = {
    author: null,
    branch: null,
    date: null,
    sha: null,
    link: null,
    headerOpacity: 1
  }

  componentDidMount () {
    console.log(window)
    // this.iscroll = new IScroll('#js-wrapper', {
    //   scrollX: true, freeScroll: true, mouseWheel: true, probeType: 3
    // });

    // document.addEventListener('scrolled', (ev) => {
    //   const opacity = ev.data.top * 100 / this.refs.headerInner.offsetHeight
    //   const opacityValue = (100 - opacity) / 100
    //
    //   if (opacityValue >= 0) {
    //     console.log(opacityValue)
    //   }
    // })

    fetch("https://api.github.com/repos/vasilisakarelova/showcase/branches/master")
      .then(response => {
        response.json().then(json => {
          const date = new Date(json.commit.commit.author.date)

          this.setState({
            author: json.commit.author.login,
            branch: json.name,
            date: moment(date).format('DD MMMM YYYY'),
            sha: json.commit.sha,
            link: json._links.html
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render () {
    return (
      <div className='header-wrap'>
        <div className='header-inner' ref='headerInner' style={{opacity: this.state.headerOpacity}}>
          <div className='header-intro'>Outer Practice <span className='header-intro--extra'>shows different aesthetics, different perspectives, a strange but unique point of view. We aim to propel talented artists and photographers that show a different angle. A place to showcase and curate eye-catching stories through a camera lense. All the images belong to the photographers mentioned and captioned and the use of their work is not permitted without their consent. A project by <a className='link' target='_blank' rel='noopener noreferrer' href="http://outerpractice.com">O–P</a>.</span></div>
          <div className='header-updated-info'>Updated: <span>{this.state.date}</span> UTC</div>
        </div>
        <div className='header-fixed--logo'>Outer Practice</div>
        <div className='header-fixed--menu'>
          <span className='header-fixed-nav--item link'>Filter, </span>
          <span className='header-fixed-nav--item link'>Submit</span>
        </div>
      </div>
    )
  }
}
