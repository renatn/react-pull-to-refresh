            var Main = React.createClass({

                getInitialState: function() {
                    return {
                        pull: false,
                        from: 0,
                        distance: 0,
                        height: 56
                    };
                },

                componentDidMount: function() {
                    const height = React.findDOMNode(this.refs.ptr).offsetHeight;
                    this.setState({height: height});
                },

                handleTouchStart: function(e) {
                    const touch = e.touches[0];
                    if (document.body.scrollTop === 0) {
                        this.setState({pull: true, from: touch.pageY});
                    }
                },

                handleTouchMove: function(e) {
                    const touch = e.touches[0];
                    if (this.state.pull) {
                        e.preventDefault();
                        this.setState({
                            distance: (touch.pageY - this.state.from) / 2.5
                        });
                    }
                },

                handleTouchEnd: function(e) {
                    if (this.state.pull) {
                        this.setState({pull: false, distance: 0});
                    }
                },

                handleMouseDown: function(e) {
                    if (document.body.scrollTop === 0) {
                        this.setState({pull: true, from: e.pageY});
                    }
                },

                handleMouseUp: function(e) {
                    if (this.state.pull) {
                        this.setState({pull: false, distance: 0});
                    }
                },

                handleMouseMove: function(e) {
                    if (this.state.pull) {
                        this.setState({
                            distance: (e.pageY - this.state.from) / 2.5
                        });
                    }
                },

                render: function() {
                    const contentTranslate = 'translate3d(0, ' + this.state.distance + 'px, 0)';
                    const contentStyle = {
                        transform: contentTranslate,
                        WebkitTransform: contentTranslate
                    };

                    const ptrTranslate = 'translate3d(0, ' + (this.state.distance - this.state.height) + 'px, 0)'
                    const ptrStyle = {
                        transform: ptrTranslate,
                        WebkitTransform: ptrTranslate
                    };

                    return (
                        <div className={this.state.distance > 70 ? "wrap ptr-active" : "wrap"}>
                            <div className="pull-to-refresh" style={ptrStyle} ref="ptr">
                                <span className="arrow">&#8595;</span>
                            </div>
                            <div className="content"
                                style={contentStyle}
                                onTouchStart={this.handleTouchStart}
                                onTouchMove={this.handleTouchMove}
                                onTouchEnd={this.handleTouchEnd}
                                onMouseDown={this.handleMouseDown}
                                onMouseUp={this.handleMouseUp}
                                onMouseLeave={this.handleMouseUp}
                                onMouseMove={this.handleMouseMove}>
                                Pull down to refresh!
                            </div>
                        </div>
                    );
                }
            });

            React.initializeTouchEvents(true);
            React.render(
              <Main/>,
              document.body
            );
