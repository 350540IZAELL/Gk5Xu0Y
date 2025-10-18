// 代码生成时间: 2025-10-18 15:33:54
const React = require('react');
const PropTypes = require('prop-types');

// 流媒体播放器组件
class StreamingMediaPlayer extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    // 设置默认状态
    this.state = {
      streamUrl: props.streamUrl,
      playing: false,
      volume: 0.5,
      error: null,
    };
    // 绑定事件处理函数
    this.handlePlayPause = this.handlePlayPause.bind(this);
  }

  // 处理播放和暂停
  handlePlayPause() {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  // 组件挂载后，创建audio元素并绑定事件
  componentDidMount() {
    this.audio = new Audio(this.state.streamUrl);
    this.audio.oncanplaythrough = this.handleCanPlayThrough;
    this.audio.onerror = this.handleError;
    this.audio.onvolumechange = this.handleVolumeChange;
  }

  // 处理音频加载完成事件
  handleCanPlayThrough() {
    this.setState({ playing: true });
  }

  // 处理音频错误事件
  handleError(e) {
    this.setState({ error: e.target.error.message });
  }

  // 处理音量改变事件
  handleVolumeChange() {
    this.setState({ volume: this.audio.volume });
  }

  // 渲染播放器UI
  render() {
    const { playing, volume, error } = this.state;
    return (
      <div>
        {error && <p>Error: {error}</p>}
        <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => this.audio.volume = parseFloat(e.target.value)}
        />
        <audio ref={this.audio} src={this.state.streamUrl} />
      </div>
    );
  }
}

// 设置props类型
StreamingMediaPlayer.propTypes = {
  streamUrl: PropTypes.string.isRequired,
};

// 设置默认props
StreamingMediaPlayer.defaultProps = {
  streamUrl: '',
};

// 导出组件
module.exports = StreamingMediaPlayer;
