class TranslationPcmProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const config = options.processorOptions || {};
    this.targetRate = 24000;
    this.silenceThreshold = config.silenceThreshold || 0.012;
    this.chunkSamples = Math.round(this.targetRate * 0.2);
    this.inputBuffer = [];
    this.outputBuffer = [];
    this.inputPosition = 0;
    this.totalOutputSamples = 0;
  }

  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel || channel.length === 0) return true;
    for (let i = 0; i < channel.length; i += 1) this.inputBuffer.push(channel[i]);

    const ratio = sampleRate / this.targetRate;
    while (this.inputPosition + ratio < this.inputBuffer.length) {
      const left = Math.floor(this.inputPosition);
      const fraction = this.inputPosition - left;
      const value = this.inputBuffer[left] * (1 - fraction) + this.inputBuffer[left + 1] * fraction;
      this.outputBuffer.push(Math.max(-1, Math.min(1, value)));
      this.inputPosition += ratio;
    }
    const consumed = Math.floor(this.inputPosition);
    if (consumed > 0) {
      this.inputBuffer.splice(0, consumed);
      this.inputPosition -= consumed;
    }

    while (this.outputBuffer.length >= this.chunkSamples) {
      const floats = this.outputBuffer.splice(0, this.chunkSamples);
      const pcm = new Int16Array(this.chunkSamples);
      let energy = 0;
      for (let i = 0; i < floats.length; i += 1) {
        energy += floats[i] * floats[i];
        pcm[i] = floats[i] < 0 ? floats[i] * 0x8000 : floats[i] * 0x7fff;
      }
      const rms = Math.sqrt(energy / floats.length);
      this.totalOutputSamples += pcm.length;
      this.port.postMessage({
        type: 'pcm',
        pcm: pcm.buffer,
        rms,
        silent: rms < this.silenceThreshold,
        inputSampleRate: sampleRate,
        outputSampleRate: this.targetRate,
        durationMs: 200,
        totalAudioSeconds: this.totalOutputSamples / this.targetRate,
      }, [pcm.buffer]);
    }
    return true;
  }
}

registerProcessor('translation-pcm-processor', TranslationPcmProcessor);

