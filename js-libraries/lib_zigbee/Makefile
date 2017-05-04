MODELS =	zigbee.js
 MODELS_OUTPUT = models.js
 ISSIM_OUTPUT = is-sim.js
 CONFIG_JS = config.js

 all: 

	cat $(MODELS) > $(ISSIM_OUTPUT)
	cat $(MODELS) > $(MODELS_OUTPUT)
	cat $(CONFIG_JS) >> $(ISSIM_OUTPUT)
	cat $(CONFIG_JS) >> $(MODELS_OUTPUT)

 clean:
	rm  -rf $(ISSIM_OUTPUT) $(MODELS_OUTPUT)
